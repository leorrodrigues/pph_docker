class CreateMaps < ActiveRecord::Migration[5.1]
  def change
    create_table :maps do |t|
      t.integer :largura
      t.integer :altura
      t.string :pesos
      t.string :inicial
      t.string :final


      t.references :historic, foreign_key: true
      t.timestamps
    end
  end
end
