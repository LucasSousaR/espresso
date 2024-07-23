class AddInfosToStatements < ActiveRecord::Migration[5.2]
  def change
    add_reference :statements, :user, foreign_key: true
    add_reference :statements, :card, foreign_key: true
  end
end
