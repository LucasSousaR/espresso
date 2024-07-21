class RenameOldStatementiesToStatements < ActiveRecord::Migration[5.2]
  def change
    rename_table :statementies, :statements
  end
end
