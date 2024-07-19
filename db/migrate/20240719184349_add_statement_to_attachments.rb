class AddStatementToAttachments < ActiveRecord::Migration[5.2]
  def change
    add_reference :attachments, :statementies, foreign_key: true
  end
end
