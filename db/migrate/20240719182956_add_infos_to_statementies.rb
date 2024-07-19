class AddInfosToStatementies < ActiveRecord::Migration[5.2]
  def change
    add_reference :statementies, :category, foreign_key: true
    add_column :statementies, :transaction_id, :integer
  end
end
