class CreateHistorics < ActiveRecord::Migration[5.1]
  def change
    create_table :historics do |t|
      t.string :metodo
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
