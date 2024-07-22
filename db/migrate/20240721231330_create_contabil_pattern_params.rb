class CreateContabilPatternParams < ActiveRecord::Migration[5.2]
  def change
    create_table :contabil_pattern_params, id: false do |t|
      t.string :id, primary_key: true
      t.references :contabil_pattern, foreign_key: true
      t.string :label
      t.string :parent_id
      t.string :position
      t.string :key

      t.timestamps
    end

    add_index :contabil_pattern_params, :position

    # Executa comando SQL para adicionar a trigger que gera UUIDs automaticamente
    execute <<-SQL
      CREATE TRIGGER before_insert_contabil_pattern_params
      BEFORE INSERT ON contabil_pattern_params
      FOR EACH ROW
      BEGIN
        IF NEW.id IS NULL OR NEW.id = '' THEN
          SET NEW.id = UUID();
        END IF;
        IF NEW.key IS NULL OR NEW.key = '' THEN
          SET NEW.key = UUID();
        END IF;
      END
    SQL
  end
end