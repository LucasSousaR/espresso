class Statement < ApplicationRecord
  has_one :attachment
  belongs_to :category
end