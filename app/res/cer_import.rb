 module Fastlane
  module Actions
    module SharedValues
      CER_IMPORT_CUSTOM_VALUE = :CER_IMPORT_CUSTOM_VALUE
    end

    class CerImportAction < Action
      def self.run(params)
        # fastlane will take care of reading in the parameter and fetching the environment variable:
        #UI.user_error!("proconfig path error")
       # UI.user_error! "aaaaaaa"
       #rlt = Action.sh("ls \ncd ..\nls")
       # UI.success("Pod lib lint Successfully3") 
       # UI.message "Parameter API Token: #{tt}"

       json = File.read('fastlane/proconfig')
       obj = JSON.parse(json)
       prouid = obj['prouid']
       macpassword = obj['macpassword']
       p12path = obj['p12path']
       p12password = obj['p12password']
       propath = obj['propath']


       if !prouid
          UI.user_error!("proconfig no prouid")
       end

       if !macpassword
          UI.user_error!("proconfig no macpassword")
       end

       if !p12path
          UI.user_error!("proconfig no p12path")
       end

       if !p12password
          UI.user_error!("proconfig no p12password")
       end

       if !propath
          UI.user_error!("proconfig no propath")
       end

       #导入p12
       user = Action.sh("echo $USER").chomp(separator=$/) 
       str1 = 'security unlock-keychain -p ' + macpassword + ' /Users/' + user + '/Library/Keychains/login.keychain'
       Action.sh(str1)
       str2 = 'security list-keychains -s /Users/' + user + '/Library/Keychains/login.keychain'
       Action.sh(str2)
       str3 = 'security import ' + p12path + ' -k /Users/' + user + '/Library/Keychains/login.keychain -P ' + p12password + ' -T /usr/bin/codesign'
       Action.sh(str3)
       #导入描述文件
       str4 = 'cp -R ' + propath + ' ' + '/Users/' + user + '/Library/MobileDevice/Provisioning\ Profiles/' + prouid + '.mobileprovision'
       Action.sh(str4)
        #return obj
        # sh "shellcommand ./path"

        # Actions.lane_context[SharedValues::TEST_ACTION_CUSTOM_VALUE] = "my_val"
      end

      #####################################################
      # @!group Documentation
      #####################################################

      def self.description
        "A short description with <= 80 characters of what this action does"
      end

      def self.details
        # Optional:
        # this is your chance to provide a more detailed description of this action
        "You can use this action to do cool things..."
      end

      def self.available_options
        # Define all options your action supports. 
        
        # Below a few examples
        # [
        #   FastlaneCore::ConfigItem.new(key: :api_token,
        #                                env_name: "FL_TEST_ACTION_API_TOKEN", # The name of the environment variable
        #                                description: "API Token for TestActionAction", # a short description of this parameter
        #                                verify_block: proc do |value|
        #                                   UI.user_error!("No API token for TestActionAction given, pass using `api_token: 'token'`") unless (value and not value.empty?)
        #                                   # UI.user_error!("Couldn't find file at path '#{value}'") unless File.exist?(value)
        #                                end),
        #   FastlaneCore::ConfigItem.new(key: :development,
        #                                env_name: "FL_TEST_ACTION_DEVELOPMENT",
        #                                description: "Create a development certificate instead of a distribution one",
        #                                is_string: false, # true: verifies the input is a string, false: every kind of value
        #                                default_value: false) # the default value if the user didn't provide one
        # ]
      end

      def self.output
        # Define the shared values you are going to provide
        # Example
        [
          ['TEST_ACTION_CUSTOM_VALUE', 'A description of what this value contains']
        ]
      end

      def self.return_value
        # If your method provides a return value, you can describe here what it does
      end

      def self.authors
        # So no one will ever forget your contribution to fastlane :) You are awesome btw!
        ["Your GitHub/Twitter Name"]
      end

      def self.is_supported?(platform)
        # you can do things like
        # 
        #  true
        # 
        #  platform == :ios
        # 
        #  [:ios, :mac].include?(platform)
        # 

        platform == :ios
      end
    end
  end
end
