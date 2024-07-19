class CreateStatementies < ActiveRecord::Migration[5.2]
  def change
    create_table :statementies do |t|
      t.datetime :performed_at, null: false
      t.integer :cost
      t.string :merchant

      t.timestamps
    end
  end
end
