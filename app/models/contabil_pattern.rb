
class ContabilPattern < ApplicationRecord
  #acts_as_paranoid

  belongs_to :company
  has_many :contabil_pattern_params, dependent: :destroy

  accepts_nested_attributes_for :contabil_pattern_params, allow_destroy: true

  def to_s
  	"#{label}"
  end

  def all_params
    ids = []

    self.contabil_pattern_params.each do |cp|
      ids += ContabilPatternParam.tree_for(cp, [:id])
    end

    return ids
  end

  def find_top_parent(node)
    return node.head if node.parent.nil?
    find_top_parent(node.parent)
  end





end
