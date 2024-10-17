Feature: The Internet Guinea Pig Website

  Scenario: As a user, I should be able to download in desired path

    Given I am on the download page
    When I click on download link
    Then The downloaded file should exist in the desired downloaded path
    
