class CreateAttachments < ActiveRecord::Migration[5.2]
  def change
    create_table :attachments do |t|
      t.attachment :file
      t.timestamps
    end
  end
end
