class Category < ApplicationRecord
  has_many :statements
  belongs_to :company
end