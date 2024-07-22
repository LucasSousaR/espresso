class AddInfoToAttachments < ActiveRecord::Migration[5.2]
  def change
    add_column :attachments, :file_base64, :text
    add_column :attachments, :file_url, :string
    add_column :attachments, :file_format, :string
  end
end
