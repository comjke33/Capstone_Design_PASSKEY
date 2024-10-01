#!/bin/bash

curl -u "ESDL:esdlesdl" -X GET 'http://192.168.0.1/cgi-bin/timepro.cgi?tmenu=iframe&smenu=sysconf_syslog_log_status' > output.txt

LOG_FILE="./output.txt"
SAVE_FILE="./log.txt"

> "$SAVE_FILE"

grep -n 'ChangeToClickColor' "$LOG_FILE" | while IFS=: read -r line_number line; do
	date=$(echo "$line" | sed -n 's/.*>\([0-9\/: ]*\)<\/td>.*/\1/p')

	ip_mac_line=$(sed -n "$((line_number + 2))p" "$LOG_FILE")

	# ip
	ip=$(echo "$ip_mac_line" | sed -n 's/.*IP&#32;할당함:&#32;\([0-9\.]*\).*/\1/p')
	
	# mac
	mac=$(echo "$ip_mac_line" | sed -n 's/.*MAC&#32;:&#32;\([0-9A-Fa-f:-]*\).*/\1/p')
	
	if [ -n "$date" ] && [ -n "$ip" ] && [ -n "$mac" ]; then
		echo "Date: $date, IP: $ip, MAC: $mac" >> "$SAVE_FILE"
	fi
done

echo "complete"


