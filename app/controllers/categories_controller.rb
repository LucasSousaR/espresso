class CategoriesController < ApplicationController
  include ApplicationHelper
  include Crud
  include EnumsHelper
  require "base64"
  before_action :set_items, only: [:show, :edit, :update, :cancel, :block, :unblock, ]
  respond_to :json, :html

  private

  def model_name
    Category
  end

  def items_params
    params.require(:category).permit(
      :name,
      :company_id
    )
  end
end
