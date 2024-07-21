# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Role.create!([
               {name: "Admin", code: "admin"},
               {name: "Operacional", code: "operational"}
             ])

User.create!([
               {name: "Admin", birthday: nil, avatar: nil, email: "admin@admin.com.br",password:"developer098", encrypted_password: "$2a$12$k2iyMJbvJgPjHG4lAcga..hRFCaniLd0yEJkO3aGKVWxBeNEFfBaa", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 11, current_sign_in_at: "2024-03-07 16:59:52", last_sign_in_at: "2024-02-18 12:03:58", current_sign_in_ip: "127.0.0.1", last_sign_in_ip: "127.0.0.1", confirmation_token: "YsuivegEnjMe5raoPnNT", confirmed_at: "2023-10-08 01:47:37", confirmation_sent_at: "2023-10-08 01:46:37", unconfirmed_email: nil, failed_attempts: 0, unlock_token: nil, locked_at: nil, role_id: 1}
             ])
