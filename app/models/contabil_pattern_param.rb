

class ContabilPatternParam < ApplicationRecord

  enum head: {
    ativo: "ativo",
    passivo: "passivo",
    exclusao: "exclusao"

  }

  enum operation: {
    credito: "credito",
    debito: "debito",
  } 

  enum head_of_cost_center: {
    trabalhistas: "trabalhistas",
    operacionais: "operacionais"
  }

  attr_accessor :update_company_id, :current_company_id, :current_user
  

  belongs_to :contabil_pattern
  
  belongs_to :parent, foreign_key: :parent_id, class_name: 'ContabilPatternParam'
  has_many :childreen, foreign_key: :parent_id, class_name: 'ContabilPatternParam', dependent: :destroy



  def self.find_top_parent(node)
    return node.head if node.parent.nil?
    find_top_parent(node.parent)
  end
  def self.find_top_parent_label(node)
    return node.label if node.parent.nil?
    find_top_parent_label(node.parent)
  end
  def self.top_parent_label(node, labels = [])
    labels << node.label

    return labels if node.parent.nil?

    top_parent_label(node.parent, labels)


  end
  def self.top_parent_id(node, labels = [])
    if node&.label&.parameterize != 'operacional'  && node&.label&.parameterize != 'nao-operacional'
      labels << node.id
    end

    return labels if node.parent.nil?

    top_parent_id(node.parent, labels)


  end
  def self.ent_or_sai(node)
    if node&.label&.parameterize == 'entradas'
      return '+'
    elsif node&.label&.parameterize == 'saidas'
      return '-'
    end
    if node&.parent.present?
      ent_or_sai(node.parent)
    end

  end
  def setup_head_group
    if parent
      self.head_group = self.parent.get_head_group
    else
      self.head_group = self.head
    end
  end

  def get_head_group
    if parent
      if self.head_group
        self.head_group 
      else
        self.parent.get_head_group
      end
    else
      self.head
    end
  end



  def to_s
    "#{label}"
  end


  def childreen_label
      
      result = if self.childreen.count > 0
        ([self.label] + self.childreen.map{|x| x.childreen_label}).uniq
      else
        self.label
      end

      return result
  end
  def self.tree_for_with_parent(instance, pluck_params=[:id])
    where("id IN (#{tree_sql_for(instance)})").includes(:parent).order("id")
  end

  def self.tree_for(instance, pluck_params=[:id])
    where("id IN (#{tree_sql_for(instance)})").order("id").pluck(pluck_params)
  end

  def tree_label
    result = self.tree_label_fixed ||= if parent
      parent.tree_label.to_s + " • " + self.label.to_s
    else
      label
    end

    self.save if self.tree_label_fixed_changed?

    return result
  end

  def child_ids
    self.childreen.pluck(:id)
  end


  def childreen_attributes
    self.childreen
  end

  def as_json(options={})
      { 
      :id => self.id,
      :key => self.key,
      :label => self.label,
      :fixed => self.fixed,
      :operation => self.operation,
      :childreen_attributes => self.childreen,
      :head => self.head,
     }  
  end

  def tail_ids(is_tail=true)
    ContabilPatternParam.tail_for(self, is_tail).pluck(:key)
  end

  def tail?
    self.childreen.count == 0
  end


end


