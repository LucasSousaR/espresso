class ContabilPatternsController < ApplicationController
  include ApplicationHelper
  include Crud
  include EnumsHelper
  require "base64"
  before_action :set_items, only: [ :show, :update, :destroy ]
  skip_before_action :verify_authenticity_token


  respond_to :json, :html

  #def index ;end
  def show
    contabil_pattern = model_name.find(params[:id])

    redirect_to contabil_pattern_params_path(contabil_pattern_id: params[:id], company_id: contabil_pattern.company_id )
  end

  def update
    if params[:removed].present?
      ContabilPatternParam.where(id: params[:removed]).find_each(&:destroy)
    else
      @node = nil

      if params[:data]
        @node = ContabilPatternParam.find_by_key(params[:data][:draggableId])

        old_position = params[:data][:source][:index]
        new_position = params[:data][:destination][:index]

        @node.parent&.childreen.each do|childreen |

          if childreen.id == params[:data][:draggableId]
            childreen.position =  new_position
          else
            childreen.position = childreen.position + 1
          end
        end
        @node.parent&.save!(validate: false)

      elsif items_params[:contabil_pattern_params_attributes].present?
        contabil_pattern = model_name.find(params[:id])
        contabil_pattern.contabil_pattern_params.delete_all

        params_create(items_params[:contabil_pattern_params_attributes], contabil_pattern.id)

      end
    end




  end

  def params_create(contabil_pattern_params, contabil_pattern_id,parent_id = nil )


    contabil_pattern_params.each do |attributes|

      item = ContabilPatternParam.create(
        key:  attributes[:key],
        label:   attributes[:label],
        position:   attributes[:position],
        operation:   attributes[:operation],
        parent_id:  parent_id,
        fixed:  attributes[:fixed].present? ? attributes[:fixed] : false,
        contabil_pattern_id:  contabil_pattern_id,
        head:  attributes[:head].present? ? attributes[:head] : nil
      )

      item.save!(validate: false)

      if attributes[:childreen_attributes].count > 0
        contabil_pattern_param = ContabilPatternParam.find_by_key(attributes[:key])
        params_create(attributes[:childreen_attributes],  contabil_pattern_id,  contabil_pattern_param.id)
      end

    end

  end

  def destroy; end



  private
  def model_name
    ContabilPattern
  end

  def find_top_parent(node)
    return node.head if node.parent.nil?

    find_top_parent(node.parent)
  end

  def items_params
    params.fetch(:contabil_pattern, {}).permit!
  end
end
