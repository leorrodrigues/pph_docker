class Historic < ApplicationRecord
  has_many :map
  belongs_to :user

  accepts_nested_attributes_for :map,:user

end
