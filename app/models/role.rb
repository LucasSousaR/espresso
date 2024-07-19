class Role < ApplicationRecord

  has_many :users
  has_many :role_permissions
  has_many :permissions, through: :role_permissions

  before_save do
    self.code = name.parameterize(separator: '_') if code.blank?
  end
end
