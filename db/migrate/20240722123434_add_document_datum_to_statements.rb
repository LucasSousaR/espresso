class AddDocumentDatumToStatements < ActiveRecord::Migration[5.2]
  def change
    add_column :statements, :documents_data, :json
  end
end
