class AddTtileToStatements < ActiveRecord::Migration[5.2]
  def change
    add_column :statements, :title, :string
  end
end
