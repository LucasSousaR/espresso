class CompanyCard < ApplicationRecord
  # acts_as_paranoid

  belongs_to :card
  belongs_to :company
end