Invoke-WebRequest "https://docs.google.com/spreadsheets/d/1gdqnvbIQByJ_ukNYsLmbQBCnNSLgCzplQkRgaSPO72c/gviz/tq?tqx=out:csv&sheet=Sheet1" -OutFile "voting.csv"
Import-Csv "voting.csv" | ConvertTo-Json | Set-Content -Path "voting.json"

$username = "ftp@digidamara.com"
$password = "S3czMlozTUVMdz09"
$local_file = "C:\Users\Gradius\Documents\GitHub\digidamara_vite\public\assets\json\voting.json"
$remote_file = "ftp://digidamara.com/vote.json"
 
$ftprequest = [System.Net.FtpWebRequest]::Create("$remote_file")
$ftprequest = [System.Net.FtpWebRequest]$ftprequest
$ftprequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
$ftprequest.Credentials = new-object System.Net.NetworkCredential($username, $password)
$ftprequest.UseBinary = $true
$ftprequest.UsePassive = $true
$filecontent = gc -en byte $local_file
$ftprequest.ContentLength = $filecontent.Length
$run = $ftprequest.GetRequestStream()
$run.Write($filecontent, 0, $filecontent.Length)
$run.Close()
$run.Dispose()