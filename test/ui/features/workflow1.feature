Feature: Saucedemo Website Automation Workflows

Scenario Outline: User should be able to log in to the saucedemo website and place an order

    Given User is able to launch the saucedemo website url
    When User logs in with <username> and <password>
    Then User is on SwagLabs homepage
    When User adds items to cart
    Then User validates number of items added to cart
    And User is able to see the items added to cart in the cart basket
    When User checksout 
    And User fills details on information page
    Then User is taken to checkout overview page
    And User is able to validate total amout for the items added to cart
    When User confirms the order
    Then User is able to place the order successfully with Thank you message on screen
    When User logs off
    Then User is on SwagLabs loginpage
    Examples:
      | username      | password        |
      | standard_user | secret_sauce    |

# Scenario Outline: User should be able to download

#   Given I am on the download page
  

# Scenario: User should be able to download

#     Given User is on the testing page
#     When User selects "File Download" link
#     And User downloads a file with name "sample_media_file.png"
#     Then User validates downloaded file "sample_media_file.png"