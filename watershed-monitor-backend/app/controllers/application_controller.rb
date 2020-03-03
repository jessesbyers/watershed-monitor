# class ApplicationController < ActionController::API
# end

# TEST ____________________________________________
class ApplicationController < ActionController::API
    def test
      render json: { test: "success" }
    end
  end
