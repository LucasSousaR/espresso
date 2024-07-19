class Category < ApplicationRecord
  has_many :statementies
  belongs_to :company
end