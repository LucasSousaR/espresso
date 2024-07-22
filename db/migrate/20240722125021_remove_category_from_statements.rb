class RemoveCategoryFromStatements < ActiveRecord::Migration[5.2]
  def change
    remove_reference :statements, :category, foreign_key: true
  end
end
