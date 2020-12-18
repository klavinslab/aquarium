# frozen_string_literal: true

# @api api.v3
module Api
  module V3
    # Group API calls.
    #
    # <b>General</b>
    #   API Status Codes:
    #
    #     STATUS_CODE: 200 - OK
    #     STATUS_CODE: 201 - Created
    #     STATUS_CODE: 401 - Unauthorized
    #     STATUS_CODE: 403 - Forbidden
    #
    #   API Success Response with Form Errors:
    #
    #     STATUS_CODE: 200
    #     {
    #       errors: {
    #         field_1: [
    #           field_1_error_1,
    #           field_1_error_2,
    #           ...
    #         ],
    #         field_2: [
    #           field_2_error_1,
    #           field_2_error_2,
    #           ...
    #         ],
    #         ...
    #       }
    #     }
    class GroupsController < ApplicationController
      # Returns all groups.
      #
      # <b>API Call:</b>
      #   GET: /api/v3/groups
      #   {
      #     token: <token>
      #   }
      #
      # <b>API Return Success:</b>
      #   STATUS CODE: 200
      #   {
      #     groups: [
      #       {
      #         id: <group_id>,
      #         name: <name>,
      #         description: <description>,
      #         created_at: <datetime>,
      #         updated_at: <datetime>
      #       },
      #       ...
      #     ]
      #   }
      #
      # @!method index(token)
      # @param token [String] a token
      def index
        # Check for any permissions
        status, response = check_token_for_permission
        render json: response.to_json, status: status.to_sym and return if response[:error]

        # Get groups
        groups = Group.find_all

        render json: { groups: groups }.to_json, status: :ok
      end

      # Returns a specific group.
      #
      # <b>API Call:</b>
      #   GET: /api/v3/groups/<id>
      #   {
      #     token: <token>
      #   }
      #
      # <b>API Return Success:</b>
      #   STATUS CODE: 200
      #   {
      #     group: {
      #       id: <group_id>,
      #       name: <name>,
      #       description: <description>,
      #       created_at: <datetime>,
      #       updated_at: <datetime>
      #     }
      #   }
      #
      # @!method show(token, id)
      # @param token [String] a token
      # @param id [Int] the id of the group
      def show
        # Check for admin permissions
        status, response = check_token_for_permission(1)
        render json: response.to_json, status: status.to_sym and return if response[:error]

        # Get group
        id = Input.int(params[:id])
        group = Group.find_id(id)

        render json: { group: group }.to_json, status: :ok
      end

      # Create a new group.
      #
      # <b>API Call:</b>
      #   GET: /api/v3/groups/create
      #   {
      #     token: <token>
      #     group: {
      #       title: <name>,
      #       message: <description>,
      #       active: <true/false>
      #     }
      #   }
      #
      # <b>API Return Success:</b>
      #   STATUS CODE: 201
      #   {
      #     group: {
      #       id: <group_id>,
      #       name: <name>,
      #       description: <description>,
      #       created_at: <datetime>,
      #       updated_at: <datetime>
      #     }
      #   }
      #
      # @!method create(token, group)
      # @param token [String] a token
      # @param group [Hash] the group
      def create
        # Check for admin permissions
        status, response = check_token_for_permission(1)
        render json: response.to_json, status: status.to_sym and return if response[:error]

        # Read sample type parameter
        params_group = params[:group] || {}

        # Create sample type
        group, errors = Group.create(params_group)
        render json: { errors: errors }.to_json, status: :ok and return if !group

        render json: { group: group }.to_json, status: :created
      end

      # Update an group.
      #
      # <b>API Call:</b>
      #   GET: /api/v3/groups/create
      #   {
      #     token: <token>
      #     id: <group_id>,
      #     group: {
      #       name: <name>,
      #       description: <description>
      #     }
      #   }
      #
      # <b>API Return Success:</b>
      #   STATUS CODE: 200
      #   {
      #     group: {
      #       id: <group_id>,
      #       name: <name>,
      #       description: <description>,
      #       created_at: <datetime>,
      #       updated_at: <datetime>
      #     }
      #   }
      #
      # @!method update(token, id, group)
      # @param token [String] a token
      # @param id [Int] the id of the group
      # @param group [Hash] the group
      def update
        # Check for admin permissions
        status, response = check_token_for_permission(1)
        render json: response.to_json, status: status.to_sym and return if response[:error]

        # Get sample type
        id = Input.int(params[:id])
        group = Group.find_id(id)
        render json: { group: nil }.to_json, status: :ok and return if !group

        # Read group parameter
        params_group = params[:group] || {}

        # Update group
        group, errors = group.update(params_group)
        render json: { errors: errors }.to_json, status: :ok and return if !group

        render json: { group: group }.to_json, status: :ok
      end

      # Delete an group.
      #
      # <b>API Call:</b>
      #   POST: /api/v3/groups/<id>/delete
      #   {
      #     token: <token>
      #   }
      #
      # <b>API Return Success:</b>
      #   STATUS_CODE: 200
      #   {
      #     message: "Group deleted"
      #   }
      #
      # @!method delete(token, id)
      # @param token [String] a token
      # @param id [Int] the id of the group
      def delete
        # Check for admin permissions
        status, response = check_token_for_permission(1)
        render json: response.to_json, status: status.to_sym and return if response[:error]

        # Get group
        id = Input.int(params[:id])
        group = Group.find_id(id)
        render json: { group: nil  }.to_json, status: :ok and return if !group

        # Delete group
        group.delete

        render json: { message: "Group deleted" }.to_json, status: :ok
      end

    end
  end
end