Feature: The Internet Guinea Pig Website

  Scenario Outline: As a user, I can log into the secure area

    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a flash message saying <message>

    Examples:
      | username | password             | message                        |
      | tomsmith | SuperSecretPassword! | You logged into a secure area! |
      | foobar   | barfoo               | Your username is invalid!      |

  # Scenario: As a user, I should be able to download in desired path

  #   Given I am on the download page
  #   When I click on download link
  #   Then The downloaded file should exist in the desired downloaded path
