class AddHeadToContabilPaternParams < ActiveRecord::Migration[5.2]
  def change
    add_column :contabil_pattern_params, :head, :string
  end
end
