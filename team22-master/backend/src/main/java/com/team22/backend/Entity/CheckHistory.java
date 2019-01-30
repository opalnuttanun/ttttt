package com.team22.backend.Entity;
import javax.persistence.*;
import lombok.*;
import java.time.LocalDate;


@Entity
@Data
@Getter @Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Table(name="CheckHistory")
public class CheckHistory {
    @Id
    @SequenceGenerator(name="CheckHistory_seq",sequenceName="CheckHistory_seq")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="CheckHistory_seq")
    @Column(name="CheckHistory_ID",unique = true, nullable = false)
     
    private @NonNull Long checkHistoryId;
  
}