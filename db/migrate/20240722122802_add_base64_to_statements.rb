class AddBase64ToStatements < ActiveRecord::Migration[5.2]
  def change
    add_column :statements, :invoice_base64, :text
  end
end
