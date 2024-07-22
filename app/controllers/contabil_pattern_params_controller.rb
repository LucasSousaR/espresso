class ContabilPatternParamsController < ApplicationController
  include ApplicationHelper
  include Crud
  include EnumsHelper
  require "base64"
  before_action :set_items, only: [:edit, :update, :destroy ]
  skip_before_action :verify_authenticity_token

  before_action :set_props, only: [:edit, :new]
  respond_to :json, :html

  def index
    @company =  Company.find( params[:company_id])
    @contabil_pattern =  ContabilPattern.find( params[:contabil_pattern_id])

    configure

  end


  def tree_label
    tree_label = ''

    @contabil_pattern_param = ContabilPatternParam.find_by_key(params[:key])
    if !@contabil_pattern_param.nil?
        tree_label = @contabil_pattern_param.tree_label
    end

    render json: tree_label
  end
  def configure
    if current_user.role.name != "Admin"
      flash[:alert] = ['Ooops!',  "Infelizmente,Você não tem permissão para acessar essa página."]
      redirect_to root_path
    else

      set_props
      @props[:editing] = true

      render 'edit'

    end
  end

  def set_props

    @items = @contabil_pattern.contabil_pattern_params.where(fixed: true)

    @props = {
      route: params[:route].present?,
      contabil_pattern: @contabil_pattern,
      configured_patterns: [],
      editing: @contabil_pattern.persisted? ? true : false,
      items: @items,
      current_user_role: current_user.role.name
    }
  end
  private
  def model_name
    ContabilPatternParam
  end
  def find_top_parent(node)
    return node.head if node.parent.nil?

    find_top_parent(node.parent)
  end
  def items_params
    params.fetch(:contabil_pattern_params, {}).permit!
  end
    
end
