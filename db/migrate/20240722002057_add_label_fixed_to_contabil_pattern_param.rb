class AddLabelFixedToContabilPatternParam < ActiveRecord::Migration[5.2]
  def change
    add_column :contabil_pattern_params, :tree_label_fixed, :string
    add_column :contabil_pattern_params, :childreen_label_fixed, :string
  end
end
