class StatementsController < ApplicationController
  include ApplicationHelper
  include Crud
  include EnumsHelper
  require "base64"
  before_action :set_items, only: [:show, :edit, :update, ]
  respond_to :json, :html



  def create
    ActiveRecord::Base.transaction do
      invoice = Base64.encode64(params[:statement][:invoice].read)
      @item = Statement.create!(
        title: params[:statement][:title],
        cost: params[:statement][:cost],
        merchant: params[:statement][:merchant],
        performed_at: params[:statement][:performed_at],
        invoice_base64: invoice,
        file_format: params[:statement][:invoice].content_type,
        documents_data: { invoice: invoice }
      )

      attachment = Attachment.find_or_initialize_by(statementies_id: @item.id)
      attachment.file = params[:statement][:invoice]
      attachment.save!(validate: false)

      respond_with @item, flash_now: false, template: path_render_crud(action_name_label)
    end
  rescue ActiveRecord::RecordInvalid => e
    # Handle the error accordingly, maybe render the form again with errors
    render :new, alert: "Error creating statement: #{e.message}"
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
