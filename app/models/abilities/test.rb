module Abilities
  class Test
    include CanCan::Ability

    def initialize(user)
      if user.present?
        alias_action :read, :update, :create, to: :modify

        if user.role.code == 'admin'
          can :read, :dashboards

          can :manage, User, role: { code: ['operational'] }, company_users: { company_id: user.company_ids }
          can :manage, Role, code: ['operational']
          can :index, Company, id: user.company_ids
          can :search_companies, Company, id: user.company_ids
          can :index, Notification
          #can :manage, Version




        elsif user.role.code == 'operational'

          can :read, :dashboards
          cannot :index, Company, id: user.company_ids
          cannot :manage, [Company,  User, Role]
          can [:graphics, :graphic_resellers], :dashboard
          can :index, []



        end
      end
    end
  end
end