class Card < ApplicationRecord
  has_paper_trail

  belongs_to :user
  validates :last4, presence: true



  private


end
