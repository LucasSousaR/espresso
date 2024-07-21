class StatementsController < ApplicationController
  include ApplicationHelper
  include Crud
  include EnumsHelper
  require "base64"
  before_action :set_items, only: [:show, :edit, :update,  :cancel, :block, :unblock ]
  respond_to :json, :html

  private

  def model_name
    Statement
  end

  def items_params
    params.require(:statement).permit(
      :cost,
      :merchant,
      :category_id,
      :transaction_id,
      :performed_at
    )
  end
end
