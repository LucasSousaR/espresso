class Company < ApplicationRecord

  validates :name, presence: true
  validates :cnpj, presence: true

  has_many :categories
  has_many :company_users, dependent: :destroy
  has_many :users, through: :company_users

  has_many :company_cards, dependent: :destroy
  has_many :cards, through: :company_cards

  private


end
