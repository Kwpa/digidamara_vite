ssh-agent

Invoke-WebRequest "https://docs.google.com/spreadsheets/d/1gdqnvbIQByJ_ukNYsLmbQBCnNSLgCzplQkRgaSPO72c/gviz/tq?tqx=out:csv&sheet=Teams" -OutFile "public\assets\csv\Teams.csv"
Import-Csv "public\assets\csv\Teams.csv" | ConvertTo-Json | Set-Content -Path "public\assets\json\Teams.json"

Invoke-WebRequest "https://docs.google.com/spreadsheets/d/1gdqnvbIQByJ_ukNYsLmbQBCnNSLgCzplQkRgaSPO72c/gviz/tq?tqx=out:csv&sheet=Barks" -OutFile "public\assets\csv\Barks.csv"
Import-Csv "public\assets\csv\Barks.csv" | ConvertTo-Json | Set-Content -Path "public\assets\json\Barks.json"

Invoke-WebRequest "https://docs.google.com/spreadsheets/d/1gdqnvbIQByJ_ukNYsLmbQBCnNSLgCzplQkRgaSPO72c/gviz/tq?tqx=out:csv&sheet=Items" -OutFile "public\assets\csv\Items.csv"
Import-Csv "public\assets\csv\Items.csv" | ConvertTo-Json | Set-Content -Path "public\assets\json\Items.json"

Invoke-WebRequest "https://docs.google.com/spreadsheets/d/1gdqnvbIQByJ_ukNYsLmbQBCnNSLgCzplQkRgaSPO72c/gviz/tq?tqx=out:csv&sheet=Story" -OutFile "public\assets\csv\Story.csv"
Import-Csv "public\assets\csv\Story.csv" | ConvertTo-Json | Set-Content -Path "public\assets\json\Story.json"

Invoke-WebRequest "https://docs.google.com/spreadsheets/d/1gdqnvbIQByJ_ukNYsLmbQBCnNSLgCzplQkRgaSPO72c/gviz/tq?tqx=out:csv&sheet=Notifications" -OutFile "public\assets\csv\Notifications.csv"
Import-Csv "public\assets\csv\Notifications.csv" | ConvertTo-Json | Set-Content -Path "public\assets\json\Notifications.json"

Invoke-WebRequest "https://docs.google.com/spreadsheets/d/1gdqnvbIQByJ_ukNYsLmbQBCnNSLgCzplQkRgaSPO72c/gviz/tq?tqx=out:csv&sheet=VotingScenarios" -OutFile "public\assets\csv\VotingScenarios.csv"
Import-Csv "public\assets\csv\VotingScenarios.csv" | ConvertTo-Json | Set-Content -Path "public\assets\json\VotingScenarios.json"

Invoke-WebRequest "https://docs.google.com/spreadsheets/d/1gdqnvbIQByJ_ukNYsLmbQBCnNSLgCzplQkRgaSPO72c/gviz/tq?tqx=out:csv&sheet=Labels" -OutFile "public\assets\csv\Labels.csv"
Import-Csv "public\assets\csv\Labels.csv" | ConvertTo-Json | Set-Content -Path "public\assets\json\Labels.json"

Invoke-WebRequest "https://docs.google.com/spreadsheets/d/1gdqnvbIQByJ_ukNYsLmbQBCnNSLgCzplQkRgaSPO72c/gviz/tq?tqx=out:csv&sheet=VideoContent" -OutFile "public\assets\csv\VideoContent.csv"
Import-Csv "public\assets\csv\VideoContent.csv" | ConvertTo-Json | Set-Content -Path "public\assets\json\VideoContent.json"

Invoke-WebRequest "https://docs.google.com/spreadsheets/d/1gdqnvbIQByJ_ukNYsLmbQBCnNSLgCzplQkRgaSPO72c/gviz/tq?tqx=out:csv&sheet=ChatChannels" -OutFile "public\assets\csv\ChatChannels.csv"
Import-Csv "public\assets\csv\ChatChannels.csv" | ConvertTo-Json | Set-Content -Path "public\assets\json\ChatChannels.json"

sftp -b ftp_scripts\sftpScript_jsonFiles.txt -P 18765 u1122-rivlkpske2gg@digidamara.com