class StatementsController < ApplicationController
  include ApplicationHelper
  include Crud
  include EnumsHelper
  require "base64"
  before_action :set_items, only: [:show, :edit, :update, ]
  respond_to :json, :html

  def index
    @q = model_name.ransack(params[:q])
    @items = @q.result(distinct: true).accessible_by(current_ability).paginate(per_page: 10, page: params[:page]).order(id: :desc)
  end

  def create
    ActiveRecord::Base.transaction do
      invoice = Base64.encode64(params[:statement][:invoice].read)
      @item = Statement.create(
        user_id: current_user.id,
        card_id: current_user.cards.last.id,
        title: params[:statement][:title],
        cost: params[:statement][:cost],
        merchant: params[:statement][:merchant],
        performed_at: params[:statement][:performed_at],
        file_format: params[:statement][:invoice].content_type,
        documents_data: { invoice: invoice }
      )
      if  @item.save!(validate: false)
        attachment = Attachment.find_or_initialize_by(statementies_id: @item.id)
        attachment.file = params[:statement][:invoice]
        attachment.save!(validate: false)

        respond_with @item, flash_now: false, template: path_render_crud(action_name_label)
      end

    end
  rescue ActiveRecord::RecordInvalid => e
    # Handle the error accordingly, maybe render the form again with errors
    render :new, alert: "Error creating statement: #{e.message}"
  end


  def parameterization_from_to
    #company = current_user.companies.last
    #contabil_pattern = company.contabil_patterns.last

    @props = {
      heard: ["ID", "Titulo","Custo", "Data Realizado"],
      # contabil_pattern_params: contabil_pattern.contabil_pattern_params.where(fixed: true),
      #statements: current_user.statements.pluck(:id, :title, :cost, :performed_at),
    }


  end


  private

  def model_name
    Statement
  end

  def items_params
    params.require(:statement).permit(
      :title,
      :cost,
      :merchant,
      :category_id,
      :transaction_id,
      :performed_at,
      :invoice_base64,
      :documents_data
    )
  end
end
