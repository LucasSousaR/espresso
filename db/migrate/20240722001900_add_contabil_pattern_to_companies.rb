class AddContabilPatternToCompanies < ActiveRecord::Migration[5.2]
  def change
    add_reference :companies, :contabil_pattern, foreign_key: true
  end
end
