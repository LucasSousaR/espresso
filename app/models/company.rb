class Company < ApplicationRecord
  include AttrJson::Record
  include AttrJson::Record::Dirty
  has_paper_trail
  before_create :generate_identifier
  validates :name, presence: true
  has_many :instances
  attr_json :phone_number, :string, container_attribute: 'settings_data'
  attr_json :token_api, :string, container_attribute: 'settings_data'
  attr_json :client_token, :string, container_attribute: 'settings_data'
  attr_json :instance_id, :string, container_attribute: 'settings_data'
  attr_json :webhook_url, :string, container_attribute: 'settings_data'
  #store :settings_data, accessors: [
  # :token_api
  #], coder: JSON


  def create_tenant_name
    begin

      Apartment::Tenant.create("company#{self.id}")

      return  "company#{self.id}"
    rescue => e
      nil
    end

  end
  private

  def generate_identifier
    self.identifier = SecureRandom.hex(4)
  end
end
