class CreateContabilPatterns < ActiveRecord::Migration[5.2]
  def change
    create_table :contabil_patterns do |t|
      t.references :company, foreign_key: true
      t.string :label

      t.timestamps
    end
  end
end
