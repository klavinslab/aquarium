require 'socket'              

module Krill

  class Server

    def initialize

      @jobs = {}

    end

    def run

      server = TCPServer.open(3500)

      loop do

        client = server.accept

        begin

          command = JSON.parse client.gets, symbolize_names: true
          jid = command[:jid]

          case command[:operation]

            when "start"

              ph = ProtocolHandler.new jid
              ph.start
              @jobs[jid] = ph
              client.puts( { response: "ok" }.to_json )

            when "continue"

              @jobs[jid].continue
              client.puts( { response: "ok" }.to_json )

            else

              client.puts( { response: "error", error: "Unknown command" }.to_json )

          end

        rescue Exception => e

          client.puts( { response: "error", error: e.to_s }.to_json )

        end

        client.close 

      end

    end

  end

end
