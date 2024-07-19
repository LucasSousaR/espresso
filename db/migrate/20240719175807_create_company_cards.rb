class CreateCompanyCards < ActiveRecord::Migration[5.2]
  def change
    create_table :company_cards do |t|
      t.references :card, foreign_key: true
      t.references :company, foreign_key: true
    end
  end
end
