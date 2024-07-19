class Attachment < ApplicationRecord
  belongs_to :statement
  has_attached_file :file
  validates_attachment_content_type :file, content_type: ['image/jpeg', 'image/png', 'application/pdf']
end