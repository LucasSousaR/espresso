class RemoveCompanyFromUser < ActiveRecord::Migration[5.2]
  def change
    remove_reference :users, :company, foreign_key: true
  end
end
