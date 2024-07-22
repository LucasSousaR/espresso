class AddFixedToContabilPatternParams < ActiveRecord::Migration[5.2]
  def change
    add_column :contabil_pattern_params, :fixed, :boolean, default: false
  end
end
