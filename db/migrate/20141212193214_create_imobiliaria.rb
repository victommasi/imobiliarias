class CreateImobiliaria < ActiveRecord::Migration
  def change
    create_table :imobiliaria do |t|
      t.string :nome
      t.string :cnpj

      t.timestamps
    end
  end
end
