# typed: false
# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { 'Factory' }
    login { 'factory' }
    password { 'password' }
    permission_ids { '.1.' }
  end
end