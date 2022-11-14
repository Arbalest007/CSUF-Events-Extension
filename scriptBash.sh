# #! /usr/bin/env bash
# #1.1
# ls | egrep '\.html$|\.css$|\.js$'
# #1.2
# echo "Welcome to CSUF extension!"
# PS3="Choose an option: "
# options=(Exit Introduction Display_Files Credit)
# select menu in "${options[@]}";
# do
#   echo -e "\nYou picked $menu ($REPLY)"
#   if [[ $menu == "Display_Files" ]]; then
#     ls
#   elif [[ $menu == "Exit" ]]; then
#     break;
#   elif [[ $menu == "Introduction" ]]; then
#     echo "Welcome to the CSUF Events Extension Program! This extension is meant to display all the upcoming and previous events for CSUF on an interactive calendar, please enjoy."
#   elif [[ $menu == "Credit" ]]; then
#     echo "Developed by Sami Bajwa, Patrick Lin, Nicholas Jones"
#   else
#     echo "Invalid option, choose again"
#   fi
# done
# #1.3
CHECK="d3d9d7416672c7033055e3df64ff1f047bc2e170db7ecbeb0e8bb1b9cfd8c338 Archive.zip"
if test -f "Archive.zip"; then
    echo "It EXISTS"
    echo $CHECK
    NEWCHECK=$(shasum -a 256 Archive.zip)
    echo -e
    echo $NEWCHECK
    if [[ "$CHECK"=="$NEWCHECK" ]]; then
        echo "FILES VERIFIED"
    else
        echo "FILES CHECKSUM DON'T MATCH"
    fi
fi